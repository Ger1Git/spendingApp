const IncomeSchema = require('../models/incomeSchema');

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    if (!title || !amount || !date || !category) {
        req.status(400).json({ message: 'All fields are required' });
    }

    if (!amount) {
        req.status(400).json({
            message: 'Amount must not be 0'
        });
    }

    const formatDate = new Date(date);
    if (isNaN(new Date(date).getTime())) {
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

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;

    IncomeSchema.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({ message: 'Income deleted' });
        })
        .catch((error) => res.status(500).json({ message: `${error}` }));
};
