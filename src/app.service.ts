import { Injectable } from '@nestjs/common';
import { CustomError } from './models/customError';
import { Link } from './models/link';

@Injectable()
export class AppService {

  private links: Link[];

  constructor() {
    this.links = new Array<Link>();
    this.links.push(
      {
        from: "http://google.com",
        lastUpdate: new Date(Date.now()).toLocaleString('it-IT'),
        numClicks: 0,
        to: "google"
      }
    )
    this.links.push(
      {
        from: "http://mozilla.org",
        lastUpdate: new Date(Date.now()).toLocaleString('it-IT'),
        numClicks: 0,
        to: "mozilla"
      }
    )
  }
  getHello(): string {
    return 'Hello World!';
  }

  getLinks(): Link[] {
    return this.links;
  }

  getLink(to) : Link {
    return this.links.find(el => el.to == to);
  }

  deleteLink(to) : boolean {
    let index = this.links.findIndex(el => el.to == to);
    if(index == -1){
      return false;
    }
    else {
      this.links.splice(index, 1)[0];
      return true;
    }
  }

  setLink(from: string, to: string): Link {
    if (!this.isValidURL(from)) {
      throw new CustomError(400, "The original 'from' url is not valid")
    }
    if (this.isDestPresent(to)) {
      throw new CustomError(400, "The wanted 'to' name is not available")
    }

    let newLink: Link = {
      from: from,
      to: to,
      numClicks: 0,
      lastUpdate: new Date(Date.now()).toLocaleString('it-IT')
    }
    this.links.push(newLink);
    return newLink;

  }

  editLink(from: string, to: string, newTo: string): Link {
    if (!this.isDestPresent(to)) {
      throw new CustomError(404, "The wanted link to edit is not present")
    }
    if (!this.isValidURL(from)) {
      throw new CustomError(400, "The original 'from' url is not valid")
    }
    let index = this.links.findIndex(el => el.to == to);
    let oldLink = this.links.splice(index, 1)[0];
    let editedLink: Link = {
      from: from ? from : oldLink.from,
      to: newTo,
      lastUpdate: new Date(Date.now()).toLocaleString('it-IT'),
      numClicks: oldLink.numClicks
    }
    this.links.push(editedLink);
    return editedLink;

  }

  private isValidURL(url: string): boolean {
    let res: RegExpMatchArray = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  }

  private isDestPresent(to: string): boolean {
    if (this.links.find(el => el.to == to)) {
      return true;
    }
    else {
      return false;
    }
  }
}
