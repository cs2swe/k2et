## How to test `Copier` class
`node copy.js`

When the file is executed, `runTests` function is called, where `Copier` class is tested for possible test cases.

## Notes
- According to the assessment description, `copy` method doesn't have any params so a private method `deepCopy` was implemented additionally to enable __recursive__ deep copy possible.
- In order to make visual confirmation of testing easier, `copy` method is first tested followed by `get`, and `delete` method because it returns a promise.