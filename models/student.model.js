const mongoose = require("mongoose")
const bcyrpt = require("bcrypt")


const studentmodel = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email address'
        ],
        unique: true,
    },

    password: {
        type: String,
        select: false,
        maxLength: [15, "Password should not exceed more than 15 charcaters"],
        minLength: [6, "Password should atleast 6 charcaters"],
        // match: [
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{3,15}$/,
        //     "Invalid password format."
        // ]


    }

}, { timestamps: true });


studentmodel.pre("save", function() {
    if (!this.isModified("password")) {
        return;
    }
    let salt = bcyrpt.genSaltSync(10);
    this.password = bcyrpt.hashSync(this.password, salt);

})


studentmodel.methods.comparepassword = function(password) {
    return bcyrpt.compareSync(password, this.password);

}

const student = mongoose.model("student", studentmodel);

module.exports = student;