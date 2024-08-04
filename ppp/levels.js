export async function loadLevels() {
    try {
        const response = await fetch('levels.json');
        const data = await response.json();
        return data.levels;
    } catch (error) {
        console.error('Error loading levels:', error);
        return [];
    }
}