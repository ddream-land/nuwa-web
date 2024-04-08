import {
    getRequestHeaders,
} from '../../../script.js';
import {
    getApiUrl,
} from '../../extensions.js';
import {
    doExtrasFetch,
} from '../../extensions.js';
import {
    getPreviewString,
} from './index.js';
import {
    saveTtsProviderSettings,
} from './index.js';

export {
    WebTtsProvider,
};

class WebTtsProvider {
    //########//
    // Config //
    //########//

    settings;
    voices = [];
    separator = ' . ';
    audioElement = document.createElement('audio');

    defaultSettings = {
        provider_endpoint: 'http://localhost:8080',
        voiceMap: {},
        rate: 0,
    };

    get settingsHtml() {
        let html = `CyberWon WebTTS Provider<br>
        <label for="web_tts_endpoint">Provider Endpoint:</label>
        <input id="web_tts_endpoint" type="text" class="text_pole" maxlength="250" value="${this.defaultSettings.provider_endpoint}"/>
        <label for="web_tts_rate">Rate: <span id="webtts_tts_rate_output"></span></label>
        <input id="web_tts_rate" type="range" value="${this.defaultSettings.rate}" min="-100" max="100" step="1" />`;
        return html;
    }

    onSettingsChange() {
        this.settings.rate = Number($('#web_tts_rate').val());
        this.settings.provider_endpoint = $('#web_tts_endpoint').val();
        $('#web_tts_rate_output').text(this.settings.rate);
        saveTtsProviderSettings();
    }

    async loadSettings(settings) {
        // Pupulate Provider UI given input settings
        if (Object.keys(settings).length == 0) {
            console.info('Using default TTS Provider settings');
        }

        // Only accept keys defined in defaultSettings
        this.settings = this.defaultSettings;

        for (const key in settings) {
            if (key in this.settings) {
                this.settings[key] = settings[key];
            } else {
                throw `Invalid setting passed to TTS Provider: ${key}`;
            }
        }

        $('#web_tts_rate').val(this.settings.rate || 0);
        $('#web_tts_rate_output').text(this.settings.rate || 0);
        $('#web_tts_rate').on('input', () => {
            this.onSettingsChange();
        });
        $('#web_tts_endpoint').val(this.settings.provider_endpoint || '');
        $('#web_tts_endpoint').on('input', () => {
            this.onSettingsChange();
        });
        await this.checkReady();

        console.debug('WebTTS: Settings loaded');
    }


    // Perform a simple readiness check by trying to fetch voiceIds
    async checkReady() {
        await this.fetchTtsVoiceObjects();
    }

    async onRefreshClick() {
        return;
    }

    //#################//
    //  TTS Interfaces //
    //#################//

    async getVoice(voiceName) {
        if (this.voices.length == 0) {
            this.voices = await this.fetchTtsVoiceObjects();
        }
        const match = this.voices.filter(
            voice => voice.name == voiceName,
        )[0];
        if (!match) {
            throw `TTS Voice name ${voiceName} not found`;
        }
        return match;
    }

    async generateTts(text, voiceId) {
        const response = await this.fetchTtsGeneration(text, voiceId);
        return response;
    }

    //###########//
    // API CALLS //
    //###########//
    async fetchTtsVoiceObjects() {
        const response = await doExtrasFetch(`${this.settings.provider_endpoint}/config`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }
        let responseJson = await response.json();
        let skpList = [];
        for (let spk in responseJson.speaker) {
            skpList.push({
                name: spk,
                voice_id: spk,
                preview_url: false,
                lang: 'zh',
            });
        }
        return skpList;
    }


    async previewTtsVoice(id) {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        const voice = await this.getVoice(id);
        const text = getPreviewString(voice.lang);
        const response = await this.fetchTtsGeneration(text, id);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }

        const audio = await response.blob();
        const url = URL.createObjectURL(audio);
        this.audioElement.src = url;
        this.audioElement.play();
    }

    async fetchTtsGeneration(inputText, voiceId) {

        console.info(`Generating new TTS for voice_id ${voiceId}`);
        const response = await doExtrasFetch(`${this.settings.provider_endpoint}`, {
            method: 'POST',
            headers: getRequestHeaders(),
            body: JSON.stringify({
                'text': inputText,
                'spk': voiceId,
                'stream': true,
            }),
        });
        if (!response.ok) {
            toastr.error(response.statusText, 'TTS Generation Failed');
            throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }
        return response;
    }
}
