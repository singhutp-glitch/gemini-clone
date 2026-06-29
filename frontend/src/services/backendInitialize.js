const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const HEALTH_URL = `${API_BASE_URL}/health`;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function waitForBackend() {
    while (true) {
        try {
            const response = await fetch(HEALTH_URL);

            if (response.ok) {
                return;
            }
        } catch (error) {
            // Backend still unavailable.
            // Intentionally ignore and retry.
        }

        await sleep(2000);
    }
}