
export async function getUser(email: string) {
  try {
    return undefined
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
