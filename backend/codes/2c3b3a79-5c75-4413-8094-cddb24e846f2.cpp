// Write your code here...

#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

int main() {
    // Demonstrating string manipulation
    std::string greeting = "Hello, World!";
    std::cout << greeting << std::endl;

    // Demonstrating vector usage
    std::vector<int> numbers = {5, 2, 8, 1, 9};
    std::sort(numbers.begin(), numbers.end());
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;

    // Demonstrating a simple function
    auto add = [](int a, int b) { return a + b; };
    std::cout << "5 + 3 = " << add(5, 3) << std::endl;

    return 0;
}