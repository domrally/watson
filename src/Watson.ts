import { config } from 'dotenv'
import { IamAuthenticator } from 'ibm-watson/auth'
import NaturalLanguageUnderstandingV1 from 'ibm-watson/natural-language-understanding/v1'

config()

const { IBM_API_KEY, IBM_URL } = process.env,
	naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
		version: '2022-04-07',
		authenticator: new IamAuthenticator({
			apikey: IBM_API_KEY!,
		}),
		serviceUrl: IBM_URL!,
	})

export async function Watson(document: string, ...targets: string[]) {
	targets.push('PLAYER')
	const text = `PLAYER: ${document}`,
		analyzeParams = {
			text,
			features: {
				emotion: {
					// needs to be true idk don't ask me
					document: true,
					targets,
				},
			},
		},
		analysisResults = await naturalLanguageUnderstanding.analyze(analyzeParams),
		// EX:
		//   "sadness": 0.32665,
		//   "joy": 0.563273,
		//   "fear": 0.033387,
		//   "disgust": 0.022637,
		//   "anger": 0.041796
		emotions = analysisResults.result.emotion!.document!.emotion!

	console.log(emotions)

	// find the strongest emotion
	let strongestEmotion: [string, number] = ['no emote', 0.5]

	for (let i = 0; i < 5; i++) {
		if (Object.values(emotions)[i] > strongestEmotion[1]) {
			strongestEmotion = [Object.keys(emotions)[i]!, Object.values(emotions)[i]]
		}
	}

	return strongestEmotion[0]
}
