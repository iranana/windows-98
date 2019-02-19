import React from "react";
import { inject, observer } from "mobx-react";
import { AppInstance } from "../Types";
import { Document, Page } from 'react-pdf/dist/entry.parcel';
import { observable, action } from "mobx";

type IProps = {
  appInstance: AppInstance
}

@inject('store')
@observer
export default class PDFViewer extends React.Component<IProps> {
  @observable numPages: number;
  @observable pageNumber: number = 1;
  @observable scale: number = 1;

  onDocumentLoadSuccess = ({ numPages }) => {
    this.numPages = numPages;
  }

  @action goBack = () => {
    this.pageNumber--;
  }

  @action goForward = () => {
    this.pageNumber++;
  }

  render () {
    return (
      <div style={{ maxWidth: "80vw", maxHeight: "80vh" }}>
        <Document file={this.props.appInstance.data} onLoadSuccess={this.onDocumentLoadSuccess}>
          <Page scale={this.scale} height={480} pageNumber={this.pageNumber} />
        </Document>
        <div>
          {this.pageNumber > 1 && <button onClick={this.goBack}>Previous page</button>}
          {this.pageNumber < this.numPages && <button onClick={this.goForward}>Next page</button>}
        </div>
      </div>
    )
  }
}