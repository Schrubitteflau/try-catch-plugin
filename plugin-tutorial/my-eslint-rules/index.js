function create(context) {
    let inTryStatementDepth = 0;
    return {
        "TryStatement": function () {
            inTryStatementDepth += 1
        },
        "TryStatement:exit": function () {
            inTryStatementDepth -= 1
        },
        "CallExpression": function (node) {
            var callee = node.callee

            if (inTryStatementDepth === 0) {
                context.report({
                    node: node,
                    message: "A Saga must handle its effects' errors (use try/catch)"
                });
            }
        }
    };
};

/*
module.exports = {
    rules: {
        "async-func-name": {
            create
        }
    }
};
*/
module.exports = {
    rules: {
        "async-func-name1": {
            create(context) {
                let sourceCode = context.getSourceCode();
                // key: name, value: node
                let functionDeclarations = {};
                return {
                    "FunctionDeclaration": function(node) {

                        function findProgram(node)
                        {
                            while (node.type !== "Program")
                            {
                                node = node.parent;
                            }
                            return node;
                        }
                        
                        functionDeclarations[node.id.name]={
                            program: findProgram(node),
                            node: node
                        };
                        console.log(functionDeclarations)
                        context.report({
                            node,
                            message: sourceCode.getJSDocComment(node) || ""
                        });
                    },
                    "CallExpression": function(node) {
                        const name = node.callee.name;
                        //if (name !== "require") console.log(node)

                        /*const a = functionDeclarations[name];
                        if (a)
                        {
                            context.report({
                                node,
                                message: sourceCode.getJSDocComment(a)
                            });
                        }*/
                        

                    }
                }
            }
        },
        "async-func-name": {
            create: function (context) {
                return {
                    FunctionDeclaration(node) {
                        if (node.async && !/Async$/.test(node.id.name)) {
                            context.report({
                                node,
                                message: "Async function name must end in 'Async'"
                            });
                        }
                    }
                }
            }
        }
    }
};