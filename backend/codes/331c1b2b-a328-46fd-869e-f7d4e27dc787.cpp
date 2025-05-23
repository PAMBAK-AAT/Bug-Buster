// Write your code here...

#include <iostream>
#include <string>

using namespace std;

int main() {
    // Declare variables
    int age;
    string name;

    // Prompt the user for their name
    cout << "Enter your name: ";
    // Read the name from the user
    getline(cin, name);

    // Prompt the user for their age
    cout << "Enter your age: ";
    // Read the age from the user
    cin >> age;

    // Output the information
    cout << "Your name is: " << name << endl;
    cout << "Your age is: " << age << endl;

    return 0;
}