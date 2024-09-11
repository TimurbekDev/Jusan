import OtpGenerator from 'otp-generator'

export const generateOTP = () => {

    return OtpGenerator.generate(6,
        {
            specialChars: false,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
        }
    )
}