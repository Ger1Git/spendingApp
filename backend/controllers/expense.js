const ExpenseSchema = require('../models/expenseSchema');

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    try {
        const expense = new ExpenseSchema({
            title,
            amount,
            category,
            description,
            date,
            userId: req.user._id
        });

        //validations
        if (!title || !amount || !date || !category || !description) {
            req.status(400).json({ message: 'All fields are required' });
        }

        if (!amount) {
            req.status(400).json({
                message: 'Amount must not be 0 or a negative value'
            });
        }

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
