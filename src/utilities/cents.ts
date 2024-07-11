export default function centsChange(amount: number, multiBy: number = 100) {
     return Math.ceil(amount * multiBy)
}