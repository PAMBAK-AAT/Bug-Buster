#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

int main() {
    std::string message = "Hello, C++!";
    std::cout << message << std::endl;

    std::vector<int> numbers = {5, 2, 8, 1, 9};
    std::sort(numbers.begin(), numbers.end());

    std::cout << "Sorted numbers: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;

    return 0;
}