import express from 'express';
import sortCriteria from './sortCriteria.mjs';

const router = express.Router();

router.post('/sort', (req, res) => {
    const { input, criteria, order, options } = req.body;

    console.log('Received /sort request');
    console.log('Input:', input);
    console.log('Criteria:', criteria);
    console.log('Order:', order);
    console.log('Options:', options);

    if (!Array.isArray(input) || input.length === 0) {
        console.error('Error: Input array is required and should not be empty');
        return res.status(400).json({ error: 'Input array is required and should not be empty' });
    }
    if (!Array.isArray(criteria) || criteria.length === 0) {
        console.error('Error: Criteria array is required and should not be empty');
        return res.status(400).json({ error: 'Criteria array is required and should not be empty' });
    }
    if (!Array.isArray(options)) {
        console.error('Error: Options should be an array');
        return res.status(400).json({ error: 'Options should be an array' });
    }

    const compare = (a, b, criterion, opts) => {
        const compareValue = sortCriteria[criterion](a, b, opts);
        console.log(`Comparing "${a}" with "${b}" using "${criterion}" criterion:`, compareValue);
        return order === 'ascending' ? compareValue : -compareValue;
    };

    const combinedSort = (a, b) => {
        for (let i = 0; i < criteria.length; i++) {
            const result = compare(a, b, criteria[i], options[i] || {});
            if (result !== 0) return result;
        }
        return 0;
    };

    const sortedResult = input.sort(combinedSort);
    console.log('Sorted result:', sortedResult);
    res.json(sortedResult);
});

export default router;
