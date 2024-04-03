const ExpenseSchema = require("../models/expenseModel");
exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date} = req.body;

    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date,
    })

    try {
        //validations
        if(!title || !category || !description || !date) {
            return res.status(400).json({message: 'All fields are required'})
        }
        if(amount <= 0) {
            return res.status(400).json({message: 'Amount must positive'})
        }
        if(isNaN(amount)) {
            amount = Number(amount);
            if(isNaN(amount)) {
                return res.status(400).json({message: 'Amount must be a number'})
            }
        }
        await expense.save()
        res.status(200).json({message: 'Expense added'})
    } catch(error) {
        res.status(500).json({message: 'Server error:', error})
    }

    console.log(expense)
}

exports.getExpenses = async (req, res) => {
    try {
        const incomes = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server error:', error})
    }
}

exports.deleteExpense = async (req, res) => {
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((error) => {
            res.status(500).json({message: 'Server error:', error})
        })
}