
export interface Issue
{
    number: number;
    html_url: string;
    state: string;
    user: User
    labels: Label[];
    assignees: User[];
    comments: number;
    created_at: string;
    closed_at: string;
    pull_request: any;
}
export interface User
{
    login: string;
    avatar_url: string;
    html_url: string;
}
export interface StatsDataUser extends User
{
    assignedCount: number;
    pullCount: number;
    issueCount: number;
}
export interface Label
{
    name: string;
    color: string;
}
export interface StatsDataLabel extends Label
{
    count: number
}