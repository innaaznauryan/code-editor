import { createServer, Model } from "miragejs";
import * as ts from "typescript";

export function makeServer() {
    createServer({
        models: {
            execute: Model,
        },

        routes() {
            this.namespace = "api";

            this.post("/execute", async (_, request) => {
                const { language, code } = JSON.parse(request.requestBody);
                let codeToRun = code;

                if (language === 'typescript') {
                    const transpiledCode = ts.transpileModule(code, {
                        compilerOptions: {
                            module: ts.ModuleKind.CommonJS,
                            target: ts.ScriptTarget.ES5,
                        },
                    }).outputText;
                    codeToRun = transpiledCode;
                }
                try {
                    const output = eval(codeToRun);
                    return {
                        status: "success",
                        output: JSON.stringify(output),
                    };
                } catch (error) {
                    return {
                        status: "error",
                        error: `${error.name}: ${error.message}`,
                    };
                }
            });
        },
    });
}
