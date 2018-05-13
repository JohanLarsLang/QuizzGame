//Johan Lång
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
//import '/css/style.css';

//const styles = require<any>("./css/style.css");

interface IManageQuestionProps {
}

interface IManageQuestionState {
    totalNrOfQuestions: number;
    newQuestionEng: string;
    newQuestionSwe: string;
    newCorrect: boolean;
    newScore: number;
    actualId: number;
    statusMessage: string;
    allQuestionInfo: string;
    countQuestion: number;
    hasFetchedData: boolean;
}


export class ManageQuestions extends React.Component<RouteComponentProps<IManageQuestionProps>, IManageQuestionState> {
    public constructor(props: RouteComponentProps<IManageQuestionProps>) {
        super(props);
        this.state = {
            totalNrOfQuestions: 0,
            newQuestionEng: "",
            newQuestionSwe: "",
            newCorrect: false,
            newScore: 1,
            actualId: 0,
            statusMessage: "",
            allQuestionInfo: "",
            countQuestion: 1,
            hasFetchedData: false
        };

        this.addNewQuestion = this.addNewQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.allQuestions = this.allQuestions.bind(this);
    }
    public render() {
        return <div className="managePage">
            <div className="page-header">
                <h1>Manage questions</h1>
            </div>
            <br />
            <div className="manageQuestions">
                <input type="text" id="newQustionEng" placeholder="New question in English..."
                    value={this.state.newQuestionEng} onChange={event => this.setState({ newQuestionEng: event.target.value })} />
                <br />
                <br />
                <input type="text" id="newQustionSwe" placeholder="New question in Swedish..." value={this.state.newQuestionSwe} onChange={event => this.setState({ newQuestionSwe: event.target.value })} />
                <br />
                <br />
                <input type="checkbox" value={this.state.newCorrect.toString()} onChange={event => this.setState({ newCorrect: event.target.checked })} /> True   Otherwise is the answear false
                <br />
                <br />
                Question score: <input type="number" min="1" max="3" step="1" id="newScore" value={this.state.newScore} onChange={event => this.setState({ newScore: Number(event.target.value) })} />
                <br />
                <br />
                <button className="btn btn-primary" disabled={!this.state.newQuestionEng || !this.state.newQuestionSwe} onClick={this.addNewQuestion}><i className="glyphicon glyphicon-plus-sign"></i> Add new qestion</button>
                <br />
                <br />
                Question id: <input type="number" min="1" max={this.state.totalNrOfQuestions} step="1" id="acualId" value={this.state.actualId} onChange={event => this.setState({ actualId: Number(event.target.value) })} />
                <br />
                <br />
                <button className="btn btn-warning" disabled={!this.state.actualId || !this.state.newQuestionEng || !this.state.newQuestionSwe} onClick={this.deleteQuestion}><i className="glyphicon glyphicon-edit"></i> Modify qestion</button>
                <br />
                <br />
                <button className="btn btn-warning" disabled={!this.state.actualId} onClick={this.deleteQuestion}><i className="glyphicon glyphicon-trash"></i> Delete question</button>
            </div>
            <br />
            <div id="showStatus">{this.state.statusMessage}</div>
            <br />
            <br />
            <div className="allQuestions">
                <button className="btn btn-primary" onClick={this.allQuestions}><i className="glyphicon glyphicon-th-list"></i> Show All existing qestions</button>
                <br />
                <div id="showAllQuestions">
                    <br />
                    {this.state.allQuestionInfo}
                </div>

            </div>

        </div>;
    }

    addNewQuestion(event: any) {



        fetch(`api/Questions/Add?newQuestionEng=${this.state.newQuestionEng}&newQuestionSwe=${this.state.newQuestionSwe}&newCorrect=${this.state.newCorrect.toString()}&newScore=${this.state.newScore.toString()}`)

            .then(data => {
                console.log('Post Qustion: ', data);
                console.log('Ok: ', data.ok)
                const okMessage = data.ok;
                return data.json();

            })
            .then(json => {
                this.setState({
                    statusMessage: 'Status message:  Question id: ' + json.id + ' added'
                });
                console.log('Post Question json: ', json);
                console.log('Question id: ', json.id, 'added');

            })
    }

    deleteQuestion(event: any) {

        fetch(`api/Questions/Delete?actualId=${this.state.actualId}`)

            .then(data => {
                console.log('Delete Qustion: ', data);
                console.log('Ok: ', data.ok)
                return data.json();

            })
            .then(json => {
                this.setState({
                    statusMessage: 'Status message:  Question id: ' + json.id + ' deleted'
                });
                console.log('Delete Question json: ', json);
            })
    }



    allQuestions(event: any) {

        fetch('api/GetQuestions')

            .then(data => {
                console.log('Get data: ', data);
                return data.json();

            })
            .then(json => {
                this.setState({
                    allQuestionInfo: json

                });
                console.log('Get json: ', json);
                // for (var n = 1; n <= 10; n++) {
                //   var span = document.createElement("span");
                // span.innerText = this.state.allQuestionInfo;
                //document.body.appendChild(span);
                //} 

            })

    }

    countAllQuestions(event: any) {

            fetch('api/Questions/Count')

            .then(data => {
                console.log('Get data: ', data);
                return data.json();

            })
            .then(json => {
                this.setState({
                    totalNrOfQuestions: json

                });
                console.log('Get json: ', json);

            })
    }

    componentDidMount() {
        this.countAllQuestions(1);
    }
}