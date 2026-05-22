


export async function getTemperatureNow(latitude:number, longitude:number) : Promise<number> {
    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`
    )
    if(!response.ok){
        throw new Error("Failed to display data. Please try again later.")
    }

    const data = await response.json()

    if(data.current?.temperature_2m === undefined){
        throw new Error ("Information not available. Please try again later.")
    }

    return data.current.temperature_2m
}
 