/* eslint-disable no-unused-vars */
import { Workbook, Column } from 'exceljs'
import { Response } from 'express'
import * as moment from 'moment'
// import {logger} from './logger';
import { utils, write as XLSXWrite } from 'xlsx'
// import { PassThrough } from 'stream';

export enum Disposition {
    attachment = 'attachment',
    inline = 'inline'
}

export interface Sheet {
    title: string,
    columns: Array<Column>,
    rows: Array<any>
}

/**
 * A small excel library abstracts the original exceljs library
 */
export class Excel {
    readonly workbook: Workbook;

    private creator: string;
    private sheets: Array<Sheet> = [];

    constructor () {
      this.workbook = new Workbook()
    }

    /**
     * Get the workbook
     */
    getWorkBook () {
      return this.workbook
    }

    /**
     * Update the author of the document.
     * @param creator
     */
    setCreator (creator: string) {
      this.creator = creator
      return this
    }

    // Add sheets to the excel document
    addSheet (columns: Array<Column>, rows: Array<any>, title?: any) {
      this.sheets.push({
        columns: columns,
        rows: rows,
        title: title || `Sheet-${Date.now().toString()}`
      })
      return this
    }

    // Set headers for streaming the file
    private static setCSVHeader (name?: string, disposition: Disposition = Disposition.attachment) {
      return {
        'Content-Type': 'text/csv',
        'Content-disposition': `${disposition}; filename=${name || 'document'}-${moment().format('DD-MM-YYYY')}.csv`
      }
    }

    private static setXLSXHeader (name?: string, disposition: Disposition = Disposition.attachment) {
      return {
        'Content-Type': 'application/vnd.ms-excel',
        'Content-disposition': `${disposition}; filename=${name || 'document'}-${moment().format('DD-MM-YYYY')}.xls`
      }
    }

    // Generate the file
    private generate () {
      if (!this.creator) this.setCreator(process.env.APP_NAME)

      // Set creator
      this.workbook.creator = process.env.APP_NAME

      this.sheets.forEach((sheet: Sheet) => {
        const worksheet = this.workbook.addWorksheet(sheet.title)

        // Sets columns
        worksheet.columns = sheet.columns

        // Set rows
        worksheet.addRows(sheet.rows)
      })
    }

    // Pipe it to the response
    async getCSVBuffer (name?: string, disposition?: Disposition) {
      this.generate()
      const meta: any = Excel.setCSVHeader(name, disposition)
      meta.generate = async (res: Response) => {
        await this.workbook.csv.write(res)
        res.end()
      }
      return meta
    }

    async getXLSXBuffer (list: any[], name?: string, disposition?: Disposition) {
      this.setCreator(process.env.APP_NAME)
      const meta: any = Excel.setXLSXHeader(name, disposition)
      meta.generate = (res: Response) => {
        const wb = utils.book_new()
        wb.SheetNames.push('Default')
        wb.Sheets.Default = utils.json_to_sheet(list)
        const output = XLSXWrite(wb, { bookType: 'xlml', type: 'buffer' })

        res.end(Buffer.from(output))
      }
      return meta
    }
}
