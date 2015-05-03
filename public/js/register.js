$("#registration-form").bootstrapValidator({
    feedbackIcons: {
        valid     : 'glyphicon glyphicon-ok',
        invalid   : 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields         : {
        email : {
            validators: {
                notEmpty: {
                    message: 'This field is required and cannot be empty'
                },
                emailAddress: {
                    message: 'This field should be a valid Email Address'
                }
            }
        },
        name : {
            validators: {
                notEmpty: {
                    message: 'This field is required and cannot be empty'
                }
            }
        },
        password: {
            validators: {
                notEmpty: {
                    message: 'This field is required and cannot be empty'
                },
                regexp: { // also used in usersetting.js (change password)
                    regexp: /^(?=.*\d+)(?=.*[@#$%&*-])([a-zA-Z0-9@#$%&*-]{7,})$/,
                    message: 'Password must have 8 or more characters, contain a digit(0-9) and a special character(@,#,$,%,&,- or *).'
                }
            }
        },
        confirm_password: {
            validators: {
                identical: {
                    field:'password',
                    message:'Please re-enter same password'
                },
                notEmpty: {
                    message: 'This field is required and cannot be empty'
                }
            }
        }
    }
});