TASK_PROMPTS = {
    "code-gen": {
        "functional correctness":
            {
                "reference-free":
                    """\
                    You will be given the code snippet for a problem. 
                    Your task is to rate the code snippet only on one metric.
                    Please make sure you read and understand these instructions carefully.
                    Please keep this document open while reviewing, and refer to it as needed.
                    
                    Evaluation Criteria:
                    Functional Correctness (0-4) - Execution-based quality of the code snippet combined with the problem. The correctness is measured by the all possible unit tests, and the comparison of the reference code. The combination of the code snippet and the problem should pass all the possible tests based on your understanding of the reference code. The length of the code snippet can not determine the correctness. You need to assess the logics line by line.
                    - A score of 0  (failing all possible test) means that the code snippet is totally incorrect and meaningless.
                    - A score of 4  (passing all possible test) means that the code snippet is totally correct and can handle all cases.
                    
                    
                    Evaluation Steps:
                    1. Read the problem carefully and identify required functionalities of the implementation.
                    2. Read the code snippet and compare it to the problem. Check if the code snippet covers all required functionalities of the problem. 
                    3. Assign a score for functional correctness on a scale of 0 to 4, where 0 is the lowest and 4 is the highest based on the Evaluation Criteria.
                    
                    Problem:
                    
                    {{PROBLEM}}
                    
                    Code Snippet:
                    
                    {{OUTPUT}}
                    
                    Evaluation Form:
                    Functional Correctness (scores ONLY):
                    """,
                "reference-enhanced":
                    """\
                    You will be given the code snippet for a problem. 
                    Your task is to rate the code snippet only on one metric.
                    Please make sure you read and understand these instructions carefully.
                    Please keep this document open while reviewing, and refer to it as needed.
                    
                    Evaluation Criteria:
                    Functional Correctness (0-4) - Execution-based quality of the code snippet combined with the problem. The correctness is measured by the all possible unit tests, and the comparison of the reference code. The combination of the code snippet and the problem should pass all the possible tests based on your understanding of the reference code. The length of the code snippet can not determine the correctness. You need to assess the logics line by line.
                    - A score of 0  (failing all possible test) means that the code snippet is totally incorrect and meaningless.
                    - A score of 4  (passing all possible test) means that the code snippet is totally correct and can handle all cases.
                    
                    
                    Evaluation Steps:
                    1. Read the problem carefully and identify required functionalities of the implementation.
                    2. Read the code snippet and compare it to the reference code. Check if the code snippet covers all required functionalities of the problem, and if it is as good as the reference code. 
                    3. Assign a score for functional correctness on a scale of 0 to 4, where 0 is the lowest and 4 is the highest based on the Evaluation Criteria.
                    
                    Problem:
                    
                    {{PROBLEM}}
                    
                    Reference Code:
                    
                    {{REFERENCE}}
                    
                    Code Snippet:
                    
                    {{OUTPUT}}
                    
                    Evaluation Form:
                    Functional Correctness (scores ONLY):
                    """
            },
        "usefulness":
            {
                "reference-free":
                    """\
                    You will be given the code snippet for a problem.
                    Your task is to rate the code snippet only on one metric.
                    Please make sure you read and understand these instructions carefully.
                    Please keep this document open while reviewing, and refer to it as needed.
                    
                    Evaluation Criteria:
                    Usefulness (0-4) Usefulness of the code snippet based on the problem description.
                    
                    - A score of 0: Snippet is not at all helpful, it is irrelevant to the problem.
                    - A score of 1: Snippet is slightly helpful, it contains information relevant to the problem, but it is easier to write the solution from scratch.
                    - A score of 2: Snippet is somewhat helpful, it requires significant changes (compared to the size of the snippet), but is still useful.
                    - A score of 3: Snippet is helpful, but needs to be slightly changed to solve the problem.
                    - A score of 4: Snippet is very helpful, it solves the problem.
                    
                    Evaluation Steps:
                    1. Read the problem carefully and identify required functionalities of the implementation.
                    2. Read the code snippet and compare it to the problem. Check if the code snippet covers all required functionalities of the problem, and if it presents them in a clear and logical order. 
                    3. Assign a score for usefulness on a scale of 0 to 4, where 0 is the lowest and 4 is the highest based on the Evaluation Criteria.
                    
                    Problem:
                    
                    {{PROBLEM}}
                    
                    Code Snippet:
                    
                    {{OUTPUT}}
                    
                    Evaluation Form:
                    Usefulness (scores ONLY):
                    """,
                "reference-enhanced":
                    """\
                    You will be given the code snippet for a problem.
                    Your task is to rate the code snippet only on three metrics.
                    Please make sure you read and understand these instructions carefully.
                    Please keep this document open while reviewing, and refer to it as needed.
                    
                    Evaluation Criteria:
                    Usefulness (0-4) Usefulness of the code snippet based on the problem description and the comparison of reference code.
                    
                    - A score of 0: Snippet is not at all helpful, it is irrelevant to the problem.
                    - A score of 1: Snippet is slightly helpful, it contains information relevant to the problem, but it is easier to write the solution from scratch.
                    - A score of 2: Snippet is somewhat helpful, it requires significant changes (compared to the size of the snippet), but is still useful.
                    - A score of 3: Snippet is helpful, but needs to be slightly changed to solve the problem.
                    - A score of 4: Snippet is very helpful, it solves the problem.
                    
                    Functional Correctness (0-4) Execution-based quality of the code snippet combined with the problem. The correctness is measured by all possible unit tests and the comparison of the reference code. The combination of the code snippet and the problem should pass all the possible tests based on your understanding of the reference code. The length of the code snippet can not determine the correctness. You need to assess the logic line by line. 
                    
                    - A score of 0 (failing all possible tests) means that the code snippet is totally incorrect and meaningless. 
                    - A score of 4 (passing all possible tests) means that the code snippet is totally correct and can handle all cases.
                    
                    Coding style (0-4) Evaluate coding style in four areas: coding standards, comments, variable and function naming, and code structure.
                    
                    - A score of 0: Code snippet does not conform to any coding standards; lacks comments or comments are meaningless; variable and function naming is arbitrary and unclear; poor code structure with a lot of duplicate code or redundancy.
                    - A score of 1: Code snippet does not conform to Java coding standards; comments are lacking; variable and function naming is inaccurate or nonsensical; code structure is confusing and there is a lot of duplicate code.
                    - A score of 2: Code snippet generally conforms to Java coding standards; comments are lacking; there are some inaccuracies in variable and function naming; code structure is moderate with some duplicate code.
                    - A score of 3: Code snippet generally conforms to java coding standards; comments are clear but with a few omissions; variable and function naming are generally reasonable; code structure is generally clear with a few duplicates of code.
                    - A score of 4: Code snippet conforms to Java coding standards; comments are clear; variable naming and function naming are accurate and meaningful; code structure is reasonable with no duplicate code.
                    
                    Evaluation Steps:
                    1. Read the problem carefully and identify required functionalities of the implementation.
                    2. Read the code snippet and compare it to the problem and reference code. Check if the code snippet covers all required functionalities of the problem, and if it presents them in a clear and logical order. 
                    3. Assign a score for usefulness, functional correctness and coding style on a scale of 0 to 4, where 0 is the lowest and 4 is the highest based on the Evaluation Criteria. Store the scores based on three criterias in the form of a dictionary, as shown: { "usefulness": 0, "functional correctness": 4,"coding style":2 }.
                    
                    Problem:
                    
                    {{PROBLEM}}
                    
                    Reference Code:
                    
                    {{REFERENCE}}
                    
                    Code Snippet:
                    
                    {{OUTPUT}}
                    
                    Evaluation Form:
                    Evaluation (scores ONLY!!! NO Explanations and other extraneous content):
                    
                    """
            },
        "suggestion":
            {
                "reference-enhanced":
                    """\
                    You will be given the code snippet,problem and the evaluation results.
                    Your task is to give Chinese suggestions for code improvements based on three metrics scores.
                    Please make sure you read and understand these instructions carefully.
                    Please keep this document open while reviewing, and refer to it as needed.
                    
                    
                    Evaluation Steps:
                    1. read the problem carefully and determine the functionality required for implementation.
                    2. read the code snippet and give Chniese suggestions for improvement based on three assessments: usefulness, functional correctness, and coding style.
                    
                    
                    Problem:
                    
                    {{PROBLEM}}
                    
                    
                    Code Snippet:
                    
                    {{OUTPUT}}
                    
                    Evaluation Scores:
                    
                    {{SCORE}}
                    
                    Suggestion:(Suggestion Only)
                    
                    
                    """
            }
    }
}
