
export interface Env {

}

function getTodayDate(): number {
	const date = new Date();
	const year = date.getFullYear();
	let month = (date.getMonth() + 1).toString();
	let day = (date.getDate()).toString();
	if (month.length <= 1) month = "0" + month;
	if (day.length <= 1) day = "0" + day;
	return Number(year.toString() + month + day);
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const { searchParams } = new URL(request.url);
		const school = searchParams.get("school");
		const format = searchParams.get("format");
		if (!school || !format) return new Response("Missing parameters", { status: 400 });
		const response = await fetch("https://kephiso.webuntis.com/WebUntis/monitor/substitution/data?school=" + school, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				formatName: format,
				schoolName: school,
				date: getTodayDate(),
				dateOffset: 0,
				strikethrough: false,
				mergeBlocks: false,
				showOnlyFutureSub: true,
				showBreakSupervisions: false,
				showTeacher: true,
				showClass: true,
				showHour: true,
				showInfo: true,
				showRoom: true,
				showSubject: true,
				groupBy: 1,
				hideAbsent: false,
				departmentIds: [],
				departmentElementType: 1,
				hideCancelWithSubstitution: false,
				hideCancelCausedByEvent: false,
				showTime: false,
				showSubstText: true,
				showAbsentElements: [1],
				showAffectedElements: [1],
				showUnitTime: true,
				showMessages: true,
				showStudentgroup: false,
				enableSubstitutionFrom: false,
				showSubstitutionFrom: 0,
				showTeacherOnEvent: false,
				showAbsentTeacher: true,
				strikethroughAbsentTeacher: false,
				activityTypeIds: [2, 3, 4],
				showEvent: false,
				showCancel: true,
				showOnlyCancel: false,
				showSubstTypeColor: false,
				showExamSupervision: false,
				showUnheraldedExams: false,
			}),
		});
		const data = await response.json();

		return new Response(JSON.stringify(data),
			{
				headers: {
					"content-type": "application/json",
					"Access-Control-Allow-Origin": "*",
				}
			});
	},
};
