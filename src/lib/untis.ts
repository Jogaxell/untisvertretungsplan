export type Substitution = {
    lesson: number;
    course: string;
    subject: string;
    room: string;
    teacher: string;
    info: string;
    text: string;
};

export async function fetchInformation(
    school: string,
    formatName: string,
    dateOffset: number,
): Promise<[Array<string>, Array<Substitution>, string, string, string]> {
    const response = await fetch(
        `https://untisvertretungsplan.jogaxel.workers.dev/?school=${school}&format=${formatName}&dateOffset=${dateOffset}`,
    );
    const data = await response.json();
    let substitutions: Substitution[] = [];

    data.payload.rows.forEach((row: any) => {
        substitutions.push({
            lesson: parseInt(row.data[0]),
            course: row.data[1],
            subject: row.data[2],
            room: row.data[3],
            teacher: row.data[4],
            info: row.data[5],
            text: row.data[6],
        });
    })

    substitutions = substitutions.sort((a, b) => {
        let aLevel = "";
        let bLevel = "";
        let i = 0;
        while (!isNaN(parseInt(a.course[i]))) {
            aLevel = aLevel + a.course[i];
            i++;
        }
        i = 0;
        while (!isNaN(parseInt(b.course[i]))) {
            bLevel += b.course[i];
            i++;
        }
        return parseInt(aLevel) - parseInt(bLevel);
    });


    const messages: string[] = [];

    data.payload.messageData.messages.forEach((message: any) => {
        messages.push(message.body);
    });

    console.log(data.payload.affectedElements.get("1"));
    

    return [messages, substitutions, data.payload.lastUpdate, data.payload.weekDay, "test"];
}
