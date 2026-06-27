import { REASONING_PROMPT } from "../../prompts/reasoningPrompt";
const  reasoningFeature = {
    name:'reasoning',

    shouldRun(context){
        return context.options.reasoning;
    },

    async execute(context){
        context.stream.write('Reasoning...');
        context.execution.request.instructions.reasoning = REASONING_PROMPT;
        
    }
}

export default reasoningFeature;