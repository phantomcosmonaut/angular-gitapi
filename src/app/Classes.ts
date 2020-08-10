import { StatsDataLabel, StatsDataUser, User, Label, Issue } from './Interfaces';

export class PlotContainer
{
    constructor(public id: string, public body: GitResponse = null){}
}

export class StatsDataIssue
{
    constructor(
        public id: number, 
        public html_Url: string,
        public daysToClose: number,
        public comments: number, 
        public isOpen: boolean,
        public labelsCount: number,
        public assigneesCount: number,
    ){}
}
export class GitResponse
{
    public labels: {[name: string]: StatsDataLabel} = {};
    public issues = new Array<StatsDataIssue>();
    public pulls =  new Array<StatsDataIssue>();
    public users: {[login: string]: StatsDataUser} = {};
    constructor() {}

    parseBody(body: Issue[]): GitResponse{
        console.log("Deserialized json with " + body.length + " issues");
        body.forEach(issue => {
          let timeDelta = new Date(issue.closed_at).getTime() - new Date(issue.created_at).getTime();
          let numDays = Math.round(timeDelta/1000/60/60/24);
          let issueData = new StatsDataIssue(
              issue.number,
              issue.html_url,
              numDays,
              issue.comments,
              issue.state.toLowerCase() === "open",
              issue.labels.length,
              issue.assignees.length,
          );
          if(issue.pull_request){
              this.issues.push(issueData)
          }
          else{
              this.pulls.push(issueData)
          }
          issue.labels.forEach(label => {
            if(this.labels.hasOwnProperty(label.name))
            {
                this.labels[label.name].count += 1;
            }
            else{
                this.labels[label.name] = {name: label.name, color: label.color, count: 1}
            }
          })
          let login = issue.user.login
          let isPull = issue.pull_request != null;
          if(this.users.hasOwnProperty(login)){
              this.users[login].pullCount += +(isPull)
              this.users[login].issueCount += +!(isPull)
          }
          else{
              this.addUser(issue.user);
              this.users[login].pullCount += +(isPull);
              this.users[login].issueCount += +!(isPull);
          }
          issue.assignees.forEach(user => {
            let login = issue.user.login
            if(this.users.hasOwnProperty(login)){
                this.users[login].assignedCount += 1;
            }
            else{
                this.addUser(user)
                this.users[login].assignedCount += 1;
            }
          })
        })
        return this;
      }

      addUser(user: User){
          var newUser = {
            login: user.login,
            avatar_url: user.avatar_url,
            html_url: user.html_url,
            assignedCount: 0,
            pullCount: 0,
            issueCount: 0
          }
        this.users[user.login] = newUser;
      }
}