
export interface NasaPowerResponse {
    features: Array<{
        properties: {
            parameter: {
                [key: string]: { [date: string]: number };
            };
        };
    }>;
}

/**
 * Busca dados climatológicos mensais da NASA POWER para uma coordenada específica
 * @param lat Latitude
 * @param lng Longitude
 */
export const fetchHistoricalClimateData = async (lat: number, lng: number) => {
    try {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1; // 1-12

        // Se estivermos no início do ano, os dados do ano anterior ainda podem estar sendo consolidados
        // A NASA POWER geralmente tem um delay de alguns meses para médias mensais terrestres
        let endYear = currentYear - 1;
        if (currentMonth < 3) {
            endYear = currentYear - 2;
        }
        const startYear = endYear;

        // T2M (Média), T2M_MAX (Máxima)
        const parameters = "T2M,T2M_MAX";
        const community = "SB";

        const url = `https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=${parameters}&community=${community}&longitude=${lng}&latitude=${lat}&format=JSON&start=${startYear}&end=${endYear}`;

        const response = await fetch(url);
        if (!response.ok) {
            console.error(`NASA Power API call failed with status ${response.status}`);
            throw new Error("Erro ao acessar NASA POWER API");
        }

        const data: NasaPowerResponse = await response.json();
        const params = data.features[0].properties.parameter;

        const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

        // A API Monthly retorna chaves como "202301", "202302", etc.
        const keys = Object.keys(params["T2M"]).filter(k => k.length === 6).sort();

        return keys.map((key, index) => ({
            month: months[index] || key,
            avgTemp: parseFloat(params["T2M"][key].toFixed(1)),
            maxTemp: parseFloat(params["T2M_MAX"][key].toFixed(1)),
            ndvi: parseFloat((0.2 + (Math.random() * 0.5)).toFixed(2)) // Simulado (Landsat)
        }));

    } catch (error) {
        console.error("Erro NASA Power:", error);
        return null;
    }
};
