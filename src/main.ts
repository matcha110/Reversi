import express from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import { ApplicationError } from './application/error/applicationError'
import { DomainError } from './domain/error/DomainError'
import { gameRouter } from './presentation/gameRouter'
import { turnRouter } from './presentation/turnRouter'

// TODO 次に置けるマスを示す
// TODO CPU対戦を実装
// TODO 最初の画面の２人対戦ボタン、CPU対戦ボタンを追加
// TODO Typescript　->　Rustで再実装
// TODO 成果物をgithub.ioで公開

const PORT = 3000

const app = express()

app.use(morgan('dev'))
app.use(express.static('static', { extensions: ['html'] }))
app.use(express.json())

app.use(gameRouter)
app.use(turnRouter)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Reversi application started: http://localhost:${PORT}`)
})

interface ErrorResponseBody {
  type: string
  message: string
}

function errorHandler(
  err: any,
  _req: express.Request,
  res: express.Response<ErrorResponseBody>,
  _next: express.NextFunction
) {
  if (err instanceof DomainError) {
    res.status(400).json({
      type: err.type,
      message: err.message
    })
    return
  }

  if (err instanceof ApplicationError) {
    switch (err.type) {
      case 'LatestGameNotFound':
        res.status(404).json({
          type: err.type,
          message: err.message
        })
        return
    }
  }

  console.error('Unexpected error occurred', err)
  res.status(500).json({
    type: 'UnecpectedError',
    message: 'Unexpected error occurred'
  })
}
