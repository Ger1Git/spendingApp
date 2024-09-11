const ExpenseSchema = require('../models/expenseSchema');

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    //validations
    if (!title || !amount || !date || !category) {
        req.status(400).json({ message: 'All fields are required' });
    }

    if (!amount) {
        req.status(400).json({
            message: 'Amount must not be 0 or a negative value'
        });
    }

    const formatDate = new Date(date);
    if (isNaN(new Date(date).getTime())) {
        return res.status(400).json({ message: 'Invalid date format' });
    }

    try {
        const expense = new ExpenseSchema({
            title,
            amount: amount * -1,
            category,
            description: description || '',
            date: formatDate,
            userId: req.user._id
        });

        await expense.save();
        res.status(200).json({ message: 'Expense added' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;

    ExpenseSchema.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({ message: 'Expense deleted' });
        })
        .catch((error) => res.status(500).json({ message: `${error}` }));
};

exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedExpense = await ExpenseSchema.findByIdAndUpdate(id, { ...req.body }, { new: true });

        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
