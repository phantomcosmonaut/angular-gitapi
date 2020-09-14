import { Injectable } from '@angular/core';
import { from, of, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
providedIn: 'root'
})
class ToasterService {
    messages = new Array<Toast>();
    subject = new BehaviorSubject(this.messages);
    constructor() {}

    ngOnInit(): void {
    }

    addToast(toast: Toast = {
        message: "Message Here", 
        bgColor: Color.dark,
        lifespan: 2000, 
        horizontalPosition: Pos.center, 
        verticalPosition: Pos.top
    }){
        this.messages.push(toast);
        this.subject.next(this.messages);
        setTimeout(() => this.removeToast(toast), toast.lifespan);
    }

    removeToast(toast: Toast){
        this.messages.splice(this.messages.indexOf(toast), 1);
        this.subject.next(this.messages)
    }
}
interface Toast{
message: string;
color?: Color;
bgColor: Color;
lifespan: number;
horizontalPosition?: Pos;
verticalPosition?: Pos
}
enum Pos{
left,
center,
right,
top,
bottom
}
enum Color{
white,
primary,
success,
dark,
light,
warning,
info,
danger
}

export {Toast, ToasterService, Color, Pos}