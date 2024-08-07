import express from 'express';
import xmljs from 'xml-js';
import jsyaml from 'js-yaml';
import Papa from 'papaparse';

const router = express.Router();

router.post('/format', (req, res) => {
    const { data, format, language } = req.body;

    console.log('Received /format request');
    console.log('Data:', data);
    console.log('Format:', format);
    console.log('Language:', language);

    if (!Array.isArray(data)) {
        console.error('Error: Data should be an array');
        return res.status(400).json({ error: 'Data should be an array' });
    }

    let formattedData;
    switch (format) {
        case 'json':
            formattedData = JSON.stringify(data, null, 2);
            break;
        case 'yaml':
            formattedData = jsyaml.dump(data);
            break;
        case 'xml':
            formattedData = xmljs.js2xml({ data }, { compact: true, spaces: 4 });
            break;
        case 'csv':
            formattedData = Papa.unparse(data.map(item => [item]));
            break;
        case 'table':
            formattedData = data.join('</td><td>');
            break;
        case 'orderedList':
            formattedData = data.map(item => `<li>${item}</li>`).join('');
            break;
        case 'unorderedList':
            formattedData = data.map(item => `<li>${item}</li>`).join('');
            break;
        case 'textFile':
            formattedData = data.join('\n');
            break;
        case 'heatmap':
            const heatmapData = data.reduce((acc, item) => {
                acc[item] = (acc[item] || 0) + 1;
                return acc;
            }, {});
            formattedData = JSON.stringify(heatmapData);
            break;
        default:
            console.error('Error: Unsupported format');
            return res.status(400).send('Unsupported format');
    }

    if (language) {
        let codeOutput = '';
        switch (language) {
            case 'python':
                codeOutput = `sorted_data = ${JSON.stringify(data, null, 2)}`;
                break;
            case 'javascript':
                codeOutput = `const sortedData = ${JSON.stringify(data, null, 2)};`;
                break;
            case 'java':
                codeOutput = `List<String> sortedData = Arrays.asList(${data.map(item => `"${item}"`).join(", ")});`;
                break;
            case 'csharp':
                codeOutput = `List<string> sortedData = new List<string> { ${data.map(item => `"${item}"`).join(", ")} };`;
                break;
            case 'php':
                codeOutput = `$sortedData = array(${data.map(item => `"${item}"`).join(", ")});`;
                break;
            case 'typescript':
                codeOutput = `const sortedData: string[] = ${JSON.stringify(data, null, 2)};`;
                break;
            case 'swift':
                codeOutput = `let sortedData = [${data.map(item => `"${item}"`).join(", ")}]`;
                break;
            case 'ruby':
                codeOutput = `sorted_data = [${data.map(item => `"${item}"`).join(", ")}]`;
                break;
            case 'cplusplus':
                codeOutput = `std::vector<std::string> sortedData = { ${data.map(item => `"${item}"`).join(", ")} };`;
                break;
            case 'go':
                codeOutput = `sortedData := []string{${data.map(item => `"${item}"`).join(", ")}}`;
                break;
            case 'rust':
                codeOutput = `let sorted_data = vec![${data.map(item => `"${item}"`).join(", ")}];`;
                break;
            case 'kotlin':
                codeOutput = `val sortedData = listOf(${data.map(item => `"${item}"`).join(", ")});`;
                break;
            case 'dart':
                codeOutput = `List<String> sortedData = [${data.map(item => `"${item}"`).join(", ")}];`;
                break;
            case 'objectivec':
                codeOutput = `NSArray *sortedData = @[@${data.map(item => `"${item}"`).join(", ")}];`;
                break;
            case 'scala':
                codeOutput = `val sortedData = List(${data.map(item => `"${item}"`).join(", ")});`;
                break;
            case 'perl':
                codeOutput = `my @sortedData = (${data.map(item => `"${item}"`).join(", ")});`;
                break;
            case 'lua':
                codeOutput = `sorted_data = {${data.map(item => `"${item}"`).join(", ")}}`;
                break;
            case 'haskell':
                codeOutput = `sortedData = [${data.map(item => `"${item}"`).join(", ")}]`;
                break;
            case 'julia':
                codeOutput = `sorted_data = [${data.map(item => `"${item}"`).join(", ")}]`;
                break;
            case 'elixir':
                codeOutput = `sorted_data = [${data.map(item => `"${item}"`).join(", ")}]`;
                break;
            default:
                codeOutput = `// Unsupported language: ${language}`;
        }
        formattedData = `// Code in ${language}:\n${codeOutput}\n\n${formattedData}`;
        console.log(formattedData);
    }

    res.send(formattedData);
});

export default router;
