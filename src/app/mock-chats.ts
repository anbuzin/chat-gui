export const mockChats = [
    {
      id: "chat-1",
      title: "AI Capabilities",
      lastMessage: "Can you explain more about your reasoning capabilities?",
      updatedAt: "2023-05-10T14:30:00Z",
    },
    {
      id: "chat-2",
      title: "Project Planning",
      lastMessage: "Let's break down the tasks for the new feature",
      updatedAt: "2023-05-09T10:15:00Z",
    },
    {
      id: "chat-3",
      title: "Code Review",
      lastMessage: "Can you explain this algorithm?",
      updatedAt: "2023-05-08T16:45:00Z",
    },
  ]
  
  export const mockMessages = [
    // Chat 1 - Multi-turn conversation with thinking blocks and evicted messages
    {
      id: "msg-1-1",
      chatId: "chat-1",
      body: "Hello! What can you help me with today?",
      llm_role: "user",
      created_at: "2023-05-10T14:30:00Z",
      evicted: true,
    },
    {
      id: "msg-1-2",
      chatId: "chat-1",
      body:
        "I can help with a variety of tasks! Here are some things I can do:\n\n- **Answer questions** on many topics\n- Help you **brainstorm ideas**\n- Assist with **writing and editing**\n- Explain **complex concepts**\n- Provide **code examples** and explanations\n\n```javascript\n// For example, here's a simple function\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n```\n\nWhat would you like to explore today?",
      llm_role: "assistant",
      created_at: "2023-05-10T14:30:30Z",
      evicted: true,
    },
    {
      id: "msg-1-3",
      chatId: "chat-1",
      body: "How do you approach complex reasoning tasks?",
      llm_role: "user",
      created_at: "2023-05-10T14:31:00Z",
      evicted: true,
    },
    {
      id: "msg-1-4",
      chatId: "chat-1",
      body:
        "When approaching complex reasoning tasks, I use a structured thinking process:\n\n1. **Break down the problem** into smaller, manageable parts\n2. **Analyze each component** systematically\n3. **Apply relevant knowledge** from my training\n4. **Consider multiple perspectives** to avoid bias\n5. **Synthesize information** into a coherent response\n\nFor example, if you asked me to solve a complex math problem, I would:\n- Identify the type of problem\n- Recall relevant formulas and methods\n- Work through the solution step-by-step\n- Verify my answer with different approaches when possible",
      llm_role: "assistant",
      created_at: "2023-05-10T14:32:00Z",
      thinking:
        "Let me think about how to explain my reasoning process...\n\nI should cover:\n- Step-by-step approach\n- How I break down problems\n- Knowledge application\n- Multiple perspectives\n- Verification methods\n\nI'll structure this as a list with a concrete example to make it clearer.",
      evicted: true,
    },
    {
      id: "msg-1-5",
      chatId: "chat-1",
      body: "Can you explain more about your reasoning capabilities?",
      llm_role: "user",
      created_at: "2023-05-10T14:33:00Z",
    },
    {
      id: "msg-1-6",
      chatId: "chat-1",
      body:
        "## My Reasoning Capabilities\n\nI approach reasoning through several complementary methods:\n\n### Chain-of-Thought Reasoning\nI break down complex problems into logical steps, making my thinking process explicit. This helps with:\n- Mathematical problems\n- Logical puzzles\n- Multi-step analyses\n\n### Tool Use\nI can use tools to extend my capabilities:\n\n```python\n# Example of a calculation I might perform\ndef calculate_compound_interest(principal, rate, time, compounds_per_year):\n    amount = principal * (1 + rate/compounds_per_year)**(compounds_per_year*time)\n    return amount\n\n# Result: $1,000 at 5% for 10 years, compounded quarterly\n# = $1,643.62\n```\n\n### Retrieval and Citation\nI can reference information I've been trained on and cite sources when appropriate.\n\nWould you like me to demonstrate any specific type of reasoning?",
      llm_role: "assistant",
      created_at: "2023-05-10T14:34:00Z",
      thinking:
        "I need to provide a comprehensive explanation of my reasoning capabilities.\n\nI'll cover:\n1. Chain-of-thought reasoning\n2. Tool use for calculations and external functions\n3. Retrieval-based reasoning\n4. Limitations I have\n\nI should include examples to make it concrete and offer to demonstrate a specific type of reasoning.\n\nTool call: calculator\nInput: compound_interest(1000, 0.05, 10, 4)\nOutput: 1643.62\n\nI'll format this with markdown to make it more readable with sections and code examples.",
    },
  
    // Chat 2 - Project planning with tool calls
    {
      id: "msg-2-1",
      chatId: "chat-2",
      body: "Let's break down the tasks for the new feature we discussed yesterday.",
      llm_role: "user",
      created_at: "2023-05-09T10:15:00Z",
      evicted: true,
    },
    {
      id: "msg-2-2",
      chatId: "chat-2",
      body:
        "Here's a breakdown of the tasks for the new feature:\n\n## Frontend Tasks\n1. Design UI mockups\n2. Implement component structure\n3. Connect to API endpoints\n\n## Backend Tasks\n1. Create database schema\n2. Develop API endpoints\n3. Implement authentication\n\n## Testing\n- Unit tests for critical functions\n- Integration tests for API\n- User acceptance testing\n\nWould you like me to elaborate on any specific area?",
      llm_role: "assistant",
      created_at: "2023-05-09T10:16:00Z",
      evicted: true,
    },
    {
      id: "msg-2-3",
      chatId: "chat-2",
      body: "Can you create a timeline for these tasks and estimate how long each might take?",
      llm_role: "user",
      created_at: "2023-05-09T10:17:00Z",
    },
    {
      id: "msg-2-4",
      chatId: "chat-2",
      body:
        "# Project Timeline Estimate\n\n| Phase | Task | Duration | Dependencies |\n|-------|------|----------|-------------|\n| **Frontend** | Design UI mockups | 3-5 days | None |\n| | Implement component structure | 5-7 days | UI mockups |\n| | Connect to API endpoints | 3-4 days | Component structure, API endpoints |\n| **Backend** | Create database schema | 2-3 days | None |\n| | Develop API endpoints | 4-6 days | Database schema |\n| | Implement authentication | 2-3 days | None |\n| **Testing** | Unit tests | 3-4 days | Respective components |\n| | Integration tests | 2-3 days | All components |\n| | User acceptance testing | 3-5 days | Complete system |\n\n## Critical Path\nBased on dependencies, the critical path appears to be:\n1. Design UI mockups (5 days)\n2. Implement component structure (7 days)\n3. Connect to API endpoints (4 days)\n4. Integration tests (3 days)\n5. User acceptance testing (5 days)\n\n**Total minimum timeline: ~24 working days**\n\nWould you like me to create a Gantt chart visualization or suggest how to parallelize some of these tasks?",
      llm_role: "assistant",
      created_at: "2023-05-09T10:19:00Z",
      thinking:
        "I need to create a realistic timeline for the project tasks.\n\nFirst, I'll estimate durations for each task:\n- Frontend UI mockups: 3-5 days\n- Component structure: 5-7 days\n- API connections: 3-4 days\n- Database schema: 2-3 days\n- API endpoints: 4-6 days\n- Authentication: 2-3 days\n- Unit tests: 3-4 days\n- Integration tests: 2-3 days\n- UAT: 3-5 days\n\nThen I need to identify dependencies:\n- Component structure depends on UI mockups\n- API connections depend on component structure and API endpoints\n- API endpoints depend on database schema\n- Integration tests depend on all components\n- UAT depends on complete system\n\nI'll create a table with this information and calculate the critical path.\n\nTool call: project_management\nInput: calculate_critical_path(tasks)\nOutput: [UI mockups, Component structure, API connections, Integration tests, UAT]\n\nTotal minimum timeline: ~24 working days",
    },
    {
      id: "msg-2-5",
      chatId: "chat-2",
      body: "That's helpful. Can you suggest how we might parallelize some of these tasks to shorten the timeline?",
      llm_role: "user",
      created_at: "2023-05-09T10:21:00Z",
    },
    {
      id: "msg-2-6",
      chatId: "chat-2",
      body:
        "# Parallelization Strategy\n\n## Week 1\n- **Frontend Team**: Begin UI mockups\n- **Backend Team**: Simultaneously work on database schema and authentication\n- **DevOps**: Set up CI/CD pipeline and testing environment\n\n## Week 2\n- **Frontend Team**: Complete UI mockups, begin component structure\n- **Backend Team**: Complete schema, begin API endpoints\n- **DevOps**: Set up monitoring and logging\n\n## Week 3\n- **Frontend Team**: Continue component structure\n- **Backend Team**: Complete API endpoints\n- **QA Team**: Begin writing test plans and unit tests for completed components\n\n## Week 4\n- **Frontend Team**: Complete component structure, begin API integration\n- **Full-Stack Developers**: Help connect frontend to backend\n- **QA Team**: Continue unit testing\n\n## Week 5\n- **All Teams**: Integration testing\n- **QA Team**: Begin UAT with stakeholders\n\n**Optimized timeline: ~20 working days** (4 weeks + 0 days)\n\n## Key Optimization Strategies:\n1. Start backend work in parallel with frontend design\n2. Begin testing activities earlier in the process\n3. Utilize full-stack developers to bridge integration\n4. Overlap UAT with final integration testing\n\nThis approach requires good communication between teams but could save approximately 4-5 days from the original timeline.",
      llm_role: "assistant",
      created_at: "2023-05-09T10:23:00Z",
    },
  
    // Chat 3 - Code review with multiple turns
    {
      id: "msg-3-1",
      chatId: "chat-3",
      body:
        "Can you explain this sorting algorithm I found? I'm not sure how it works.\n\n```python\ndef sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr\n```",
      llm_role: "user",
      created_at: "2023-05-08T16:45:00Z",
      evicted: true,
    },
    {
      id: "msg-3-2",
      chatId: "chat-3",
      body:
        "This is the **Bubble Sort** algorithm, one of the simplest sorting algorithms. Here's how it works:\n\n1. It repeatedly steps through the list, compares adjacent elements, and swaps them if they're in the wrong order.\n2. The process is repeated until no more swaps are needed, meaning the list is sorted.\n\nLet's break down the code:\n\n```python\ndef sort(arr):\n    n = len(arr)  # Get the length of the array\n    \n    # Outer loop: each pass places the next largest element in its correct position\n    for i in range(n):\n        \n        # Inner loop: compare adjacent elements and swap if needed\n        # Note: n-i-1 because after each pass, the largest element is already at the end\n        for j in range(0, n-i-1):\n            \n            # If the current element is greater than the next element, swap them\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n                \n    return arr\n```\n\n### Example:\n\nLet's trace through sorting the array `[5, 3, 8, 4, 2]`:\n\n**First pass (i=0):**\n- Compare 5 & 3: Swap → `[3, 5, 8, 4, 2]`\n- Compare 5 & 8: No swap → `[3, 5, 8, 4, 2]`\n- Compare 8 & 4: Swap → `[3, 5, 4, 8, 2]`\n- Compare 8 & 2: Swap → `[3, 5, 4, 2, 8]`\n\n**Second pass (i=1):**\n- Compare 3 & 5: No swap → `[3, 5, 4, 2, 8]`\n- Compare 5 & 4: Swap → `[3, 4, 5, 2, 8]`\n- Compare 5 & 2: Swap → `[3, 4, 2, 5, 8]`\n\nAnd so on until the array is sorted.\n\n### Time Complexity:\n- Worst-case: O(n²) - when the array is reverse sorted\n- Best-case: O(n) - when the array is already sorted (with a modified version that stops early)\n- Average-case: O(n²)\n\nBubble sort is not efficient for large datasets but is simple to understand and implement.",
      llm_role: "assistant",
      created_at: "2023-05-08T16:46:00Z",
      evicted: true,
    },
    {
      id: "msg-3-3",
      chatId: "chat-3",
      body: "Thanks for explaining! How does this compare to other sorting algorithms in terms of efficiency?",
      llm_role: "user",
      created_at: "2023-05-08T16:48:00Z",
    },
    {
      id: "msg-3-4",
      chatId: "chat-3",
      body:
        "# Sorting Algorithm Comparison\n\n## Bubble Sort vs. Other Algorithms\n\n| Algorithm | Time Complexity (Best) | Time Complexity (Average) | Time Complexity (Worst) | Space Complexity | Stability |\n|-----------|------------------------|---------------------------|-------------------------|-----------------|----------|\n| **Bubble Sort** | O(n) | O(n²) | O(n²) | O(1) | Stable |\n| **Selection Sort** | O(n²) | O(n²) | O(n²) | O(1) | Unstable |\n| **Insertion Sort** | O(n) | O(n²) | O(n²) | O(1) | Stable |\n| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | O(n) | Stable |\n| **Quick Sort** | O(n log n) | O(n log n) | O(n²) | O(log n) | Unstable |\n| **Heap Sort** | O(n log n) | O(n log n) | O(n log n) | O(1) | Unstable |\n| **Tim Sort** | O(n) | O(n log n) | O(n log n) | O(n) | Stable |\n\n## Efficiency Analysis\n\nBubble Sort is generally one of the **least efficient** sorting algorithms for large datasets:\n\n- **Much slower** than O(n log n) algorithms like Quick Sort, Merge Sort, and Heap Sort\n- Only performs well on very small datasets or nearly sorted arrays\n- Uses minimal memory (in-place sorting) which is its main advantage\n\n## When to Use Each Algorithm\n\n- **Bubble Sort**: Only for educational purposes or tiny datasets\n- **Insertion Sort**: Small datasets or nearly sorted data\n- **Merge Sort**: When stable sorting is needed and extra memory is available\n- **Quick Sort**: General purpose, very fast in practice (used in many language standard libraries)\n- **Heap Sort**: When guaranteed O(n log n) performance is needed with minimal space\n- **Tim Sort**: Real-world data with some pre-existing order (used in Python and Java)\n\nFor your Python example, replacing Bubble Sort with Python's built-in `sorted()` function (which uses Tim Sort) would be much more efficient for any non-trivial dataset.",
      llm_role: "assistant",
      created_at: "2023-05-08T16:50:00Z",
      thinking:
        "I need to compare Bubble Sort with other common sorting algorithms.\n\nI'll create a comparison table with:\n- Time complexity (best, average, worst cases)\n- Space complexity\n- Stability\n\nCommon sorting algorithms to include:\n- Bubble Sort\n- Selection Sort\n- Insertion Sort\n- Merge Sort\n- Quick Sort\n- Heap Sort\n- Tim Sort (used in Python)\n\nThen I'll analyze when each algorithm is appropriate to use.\n\nTool call: algorithm_analyzer\nInput: compare_sorting_algorithms()\nOutput: [comparison data for each algorithm]\n\nI'll format this with a table and sections for efficiency analysis and practical usage recommendations.",
    },
    {
      id: "msg-3-5",
      chatId: "chat-3",
      body: "Could you implement a more efficient sorting algorithm for me in Python?",
      llm_role: "user",
      created_at: "2023-05-08T16:52:00Z",
    },
    {
      id: "msg-3-6",
      chatId: "chat-3",
      body:
        "Here's an implementation of Quick Sort, which is much more efficient than Bubble Sort for most cases:\n\n```python\ndef quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    \n    pivot = arr[len(arr) // 2]  # Choose middle element as pivot\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    \n    return quick_sort(left) + middle + quick_sort(right)\n```\n\nThis implementation:\n- Uses the divide-and-conquer approach\n- Has average time complexity of O(n log n)\n- Is more memory-intensive than bubble sort but much faster\n\nFor even better performance in practice, here's a more optimized version with in-place partitioning:\n\n```python\ndef quick_sort_in_place(arr, low=0, high=None):\n    if high is None:\n        high = len(arr) - 1\n    \n    def partition(arr, low, high):\n        pivot = arr[high]  # Choose last element as pivot\n        i = low - 1\n        \n        for j in range(low, high):\n            if arr[j] <= pivot:\n                i += 1\n                arr[i], arr[j] = arr[j], arr[i]\n        \n        arr[i + 1], arr[high] = arr[high], arr[i + 1]\n        return i + 1\n    \n    if low < high:\n        pivot_index = partition(arr, low, high)\n        quick_sort_in_place(arr, low, pivot_index - 1)\n        quick_sort_in_place(arr, pivot_index + 1, high)\n    \n    return arr\n```\n\nUsage example:\n\n```python\n# Sample array\narr = [5, 3, 8, 4, 2, 1, 10, 7]\n\n# Using the first implementation\nsorted_arr = quick_sort(arr)\nprint(sorted_arr)  # Output: [1, 2, 3, 4, 5, 7, 8, 10]\n\n# Using the in-place implementation\narr2 = [5, 3, 8, 4, 2, 1, 10, 7]\nquick_sort_in_place(arr2)\nprint(arr2)  # Output: [1, 2, 3, 4, 5, 7, 8, 10]\n```\n\nFor most practical purposes in Python, I'd recommend using the built-in `sorted()` function or `.sort()` method, which use Tim Sort - a hybrid of merge sort and insertion sort optimized for real-world data.",
      llm_role: "assistant",
      created_at: "2023-05-08T16:54:00Z",
    },
  ]
  