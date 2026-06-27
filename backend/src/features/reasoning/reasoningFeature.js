import { REASONING_PROMPT } from "../../prompts/reasoningPrompt";
const  reasoningFeature = {
    name:'reasoning',

    shouldRun(context){
        return context.options.reasoning;
    },

    async execute(context){
        const feature ={};
        context.stream.write('Reasoning...');
        feature.name = 'reasoning'
        feature.instruction = REASONING_PROMPT;
        context.features.push(feature);
    }
}

export default reasoningFeature;