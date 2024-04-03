const IncomeSchema = require("../models/incomeModel");
exports.addIncome = async (req, res) => {
    const {title, amount, category, description, date} = req.body;

    const income = IncomeSchema({
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
        await income.save()
        res.status(200).json({message: 'Income added'})
    } catch(error) {
        res.status(500).json({message: 'Server error:', error})
    }

    console.log(income)
}

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server error:', error})
    }
}

exports.deleteIncome = async (req, res) => {
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((error) => {
            res.status(500).json({message: 'Server error:', error})
        })
}