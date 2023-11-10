import { Response } from 'express'
import * as moment from 'moment'
import { compile } from 'ejs'
import * as wkhtmltopdf from 'wkhtmltopdf'
import { tableHtmlTemplate } from '../constants/tableHtmlTemplate'
import { logger } from '../lib/system/logger'

export const exportPdf = async (columns: string[], rows: string[][], baseName = 'pdf-report') => {
  const compiledHtml = compile(tableHtmlTemplate)({ columns, rows })

  logger.debug('Comiled HTML', { compiledHtml })

  wkhtmltopdf.command = '/opt/bin/wkhtmltopdf'

  const fileName = `${baseName || 'document'}-${Math.floor(Math.random() * 1000000)}-${moment().format('DD-MM-YYYY')}.pdf`
  const html = '<!DOCTYPE html><html><head><title>Example</title></head><body><p>This is an example of a simple HTML page with one paragraph.</p></body></html>'

  const stream = wkhtmltopdf(html, {
    debug: true
  })

  return {
    'Content-Type': 'application/pdf',
    'Content-disposition': `attachment; filename=${fileName}`,
    generate: (res: Response) => {
      stream.pipe(res)
    }
  }
}
