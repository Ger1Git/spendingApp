import IncomeSchema from '../models/incomeSchema.js';  // Import with the .js extension

export const addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    if (!title || !amount || !date || !category) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (amount <= 0) {
        return res.status(400).json({
            message: 'Amount must not be 0 or a negative value'
        });
    }

    const formatDate = new Date(date);
    if (isNaN(formatDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date format' });
    }

    try {
        const income = new IncomeSchema({
            title,
            amount,
            category,
            description: description || '',
            date: formatDate,
            userId: req.user._id
        });

        await income.save();
        res.status(200).json({ message: 'Income added' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteIncome = async (req, res) => {
    const { id } = req.params;

    try {
        await IncomeSchema.findByIdAndDelete(id);
        res.status(200).json({ message: 'Income deleted' });
    } catch (error) {
        res.status(500).json({ message: `${error}` });
    }
};

export const updateIncome = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedIncome = await IncomeSchema.findByIdAndUpdate(id, { ...req.body }, { new: true });

        if (!updatedIncome) {
            return res.status(404).json({ message: 'Income not found' });
        }

        res.status(200).json(updatedIncome);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
