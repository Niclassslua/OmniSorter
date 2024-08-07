# OmniSorter 🚀

## Table of Contents 📚
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
    - [Web Interface](#web-interface)
    - [API Endpoints](#api-endpoints)
- [Examples](#examples)
- [Supported Languages](#supported-languages)
- [License](#license)

## Overview 🌟
OmniSorter is a versatile sorting tool that can sort any array of strings based on various criteria and formats the output in multiple programming languages. Whether you're a developer, data analyst, or just someone who loves order, OmniSorter is here to help.

## Features ✨
- **Multiple Sorting Criteria**: Alphabetical, Length, Numeric, Date, Frequency, and many more.
- **Multiple Output Formats**: JSON, YAML, XML, CSV, HTML Table, Ordered/Unordered List, Chart, Text File, Heatmap.
- **Programming Language Integration**: Generates sorted results in 20 different programming languages.
- **Web Interface**: User-friendly interface to easily sort and format data.
- **API Endpoints**: Flexible API to integrate OmniSorter into your own applications.

## Installation 🛠
To install and run OmniSorter locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Niclassslua/OmniSorter.git
   cd OmniSorter
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Run the tests:**
   ```bash
   npm test
   ```

## Usage 🎯

### Web Interface 🌐
1. Open your browser and navigate to `http://localhost:3000`.
2. Enter the array of strings you want to sort.
3. Select your desired sorting criteria, order, output format, and programming language.
4. Click "Sort" to see the results.

### API Endpoints 🔌

#### Sort Endpoint
- **URL**: `/sort`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "input": ["string1", "string2", "string3"],
    "criteria": ["alphabetical"],
    "order": "ascending",
    "options": [{}]
  }
  ```
- **Response**:
  ```json
  ["sortedString1", "sortedString2", "sortedString3"]
  ```

#### Format Endpoint
- **URL**: `/format`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "data": ["sortedString1", "sortedString2", "sortedString3"],
    "format": "json",
    "language": "python"
  }
  ```
- **Response**:
  ```json
  "// Code in python:\nsorted_data = [\"sortedString1\", \"sortedString2\", \"sortedString3\"]\n\n[\n  \"sortedString1\",\n  \"sortedString2\",\n  \"sortedString3\"\n]"
  ```

## Examples 📋

### Sorting Example
```json
{
  "input": ["apple", "orange", "banana"],
  "criteria": ["alphabetical"],
  "order": "ascending",
  "options": [{}]
}
```
**Result**:
```json
["apple", "banana", "orange"]
```

### Formatting Example
```json
{
  "data": ["apple", "banana", "orange"],
  "format": "json",
  "language": "javascript"
}
```
**Result**:
```json
"// Code in javascript:\nconst sortedData = [\n  \"apple\",\n  \"banana\",\n  \"orange\"\n];\n\n[\n  \"apple\",\n  \"banana\",\n  \"orange\"\n]"
```

## Supported Languages 🌍
OmniSorter supports code generation in the following programming languages:

- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" width="40" height="40"/> **Python**
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" width="40" height="40"/> **JavaScript**
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" width="40" height="40"/> **Java**
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" alt="C#" width="40" height="40"/> **C#**
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" alt="PHP" width="40" height="40"/> **PHP**
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" width="40" height="40"/> **TypeScript**
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" alt="Swift" width="40" height="40"/> **Swift**
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg" alt="Ruby" width="40" height="40"/> **Ruby**
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" width="40" height="40"/> **C++**
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" alt="Go" width="40" height="40"/> **Go**
- <img src="https://raw.githubusercontent.com/devicons/devicon/v2.16.0/icons/rust/rust-original.svg" alt="Rust" width="40" height="40"/> **Rust**
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" alt="Kotlin" width="40" height="40"/> **Kotlin**
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" alt="Dart" width="40" height="40"/> **Dart**
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" alt="Objective-C" width="40" height="40"/> **Objective-C**
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg" alt="Scala" width="40" height="40"/> **Scala**
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/perl/perl-original.svg" alt="Perl" width="40" height="40"/> **Perl**
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg" alt="Lua" width="40" height="40"/> **Lua**
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/haskell/haskell-original.svg" alt="Haskell" width="40" height="40"/> **Haskell**
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/julia/julia-original.svg" alt="Julia" width="40" height="40"/> **Julia**
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elixir/elixir-original.svg" alt="Elixir" width="40" height="40"/> **Elixir**

## License 📜
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.