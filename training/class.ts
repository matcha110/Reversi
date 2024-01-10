// 言語により型の定義の細かさが異なる
// number->jsとTsではint,floatと区別しない
// java,Rust等ではint32,int64,floatと細かく型を分ける

class Fraction{
    //　省略前 
    // private _numerator: number
    // private _denominator: number

    // constructor(numerator: number, denominator: number){
    //     this._numerator = numerator
    //     this._denominator = denominator
    // }

    // 省略Ver
    constructor(private _numerator: number, private _denominator: number){}

    add(other: Fraction): Fraction{
        // 1/2 + 1/3
        // 分子(numerator)：1*3 + 1*2 = 5
        // 分母(denominator)：3*2 = 6
        
        const resultNumerator = 
        this._numerator * other._denominator +
        this._denominator * other._numerator
        const resultDenominator = this._denominator * other._denominator

        return new Fraction(resultNumerator, resultDenominator)
    }

    Tostring(): string{
        return `${this._numerator}/${this._denominator}`
    }

    // getter　フィールドの変更は防ぎながら数値の読み込みは許可するようなオブジェクト指向の基本
    get numerator(){
        return this._numerator
    }
    // getter
    get denominator(){
        return this._denominator
    }
}

// new ～ でコンストラクタを呼び出してインスタンスを作成できる
const f1 = new Fraction(1, 2)
console.log(f1.numerator)
console.log(f1.denominator)

// f1.numerator = 3
// console.log(f1.numerator)
const f2 = new Fraction(1, 3)
console.log(f2.Tostring())

const addResult = f1.add(f2)
console.log(addResult.Tostring())


