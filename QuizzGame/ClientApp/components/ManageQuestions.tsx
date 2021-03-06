import * as React from 'react';
import { RouteComponentProps } from 'react-router';


interface IManageQuestionProps {
}

interface IManageQuestionState {
    totalNrOfQuestions: number;
    newQuestionEng: string;
    newQuestionSwe: string;
    newCorrect: boolean;
    newScore: number;
    actualId: number;
    statusOk: boolean;
    statusMessage: string;
    question: questionInfo[];
    allQuestionInfo: string;
    countQuestion: number;
    hasFetchedData: boolean;
}

interface questionInfo {
    id: number;
    quizzEng: string;
    quizzSwe: string;
    correct: boolean;
    score: number;

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
            statusOk: false,
            statusMessage: "",
            question: [],
            allQuestionInfo: "",
            countQuestion: 1,
            hasFetchedData: false
        };

        this.addNewQuestion = this.addNewQuestion.bind(this);
        this.modifyQuestion = this.modifyQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.showAllQuestions = this.showAllQuestions.bind(this);
    }
    public render() {
        let question = this.state.question;
        let oldlist = question.map(q => q.id + ', ' + q.quizzEng + ', ' + q.quizzSwe + ', ' + q.correct + ', ' + q.score);
        let list = oldlist.map((x, index) =>
            <li className="list-group-item" key={x + ':' + index}>{x}</li>);

        return <div>
            <header>
                <h1>Manage questions</h1>
            </header>
            <br />
            <br />
            <p className="list">Add, modify and delete questions.....</p>

            <div>
                <input type="text" id="newQustionEng" placeholder="New question in English..."
                    value={this.state.newQuestionEng} onChange={event => this.setState({ newQuestionEng: event.target.value })} />
                <br />
                <br />
                <input type="text" id="newQustionSwe" placeholder="New question in Swedish..." value={this.state.newQuestionSwe} onChange={event => this.setState({ newQuestionSwe: event.target.value })} />
                <br />
                <br />
                <input type="checkbox" value={this.state.newCorrect.toString()} onChange={event => this.setState({ newCorrect: event.target.checked })} /> True  ,Otherwise the answer will be: False
                <br />
                <br />
                Question score: <input type="number" min="1" max="3" step="1" id="newScore" value={this.state.newScore} onChange={event => this.setState({ newScore: Number(event.target.value) })} />
                <br />
                <br />
                <button className="btn btn-primary btn-lg" disabled={!this.state.newQuestionEng || !this.state.newQuestionSwe} onClick={this.addNewQuestion}><i className="glyphicon glyphicon-plus-sign"></i> Add new qestion</button>
                <br />
                <br />
                Question id: <input type="number" min="1" max={this.state.totalNrOfQuestions} step="1" onChange={event => this.setState({ actualId: Number(event.target.value) })} />
                <br />
                <br />
                <button className="btn btn-warning btn-lg" disabled={!this.state.actualId || !this.state.newQuestionEng || !this.state.newQuestionSwe} onClick={this.modifyQuestion}><i className="glyphicon glyphicon-edit"></i> Modify question</button>
                <br />
                <br />
                <button className="btn btn-warning btn-lg" disabled={!this.state.actualId} onClick={this.deleteQuestion}><i className="glyphicon glyphicon-trash"></i> Delete question</button>
            </div>
            <br />
            <div id="showStatus">{this.state.statusMessage}</div>
            <br />
            <br />
            <div className="allQuestions">
                <button className="btn btn-primary btn-lg" onClick={this.showAllQuestions}><i className="glyphicon glyphicon-th-list"></i> Show All existing qestions</button>
                <br />
                <div>
                    <br />
                    <div className="list">
                        {this.state.allQuestionInfo}
                        <ul className="list-group">{list}</ul>
                    </div>

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
                    statusMessage: 'Status message:  Question id: ' + json.id + ' added',
                    totalNrOfQuestions: this.state.totalNrOfQuestions + 1
                });
                console.log('Post Question json: ', json);
                console.log('Question id: ', json.id, 'added');

            })
    }

    modifyQuestion(event: any) {

        this.setState({
            hasFetchedData: false
        });

        fetch('api/Questions/Modify?actualId=' + this.state.actualId + '&newQuestionEng=' + this.state.newQuestionEng + '&newQuestionSwe=' + this.state.newQuestionSwe + '&newCorrect=' + this.state.newCorrect + '&newScore=' + this.state.newScore)

            .then(data => {
                console.log('Modify Qustion: ', data);
                console.log('Ok: ', data.ok)
                this.setState({
                    statusOk: data.ok
                });
                return data.json();

            })

            .then(json => {
                console.log('Modify Question json: ', json);
                this.setState({
                    hasFetchedData: true,
                    statusMessage: 'Status message:  Question id: ' + this.state.actualId + ' successfully modified'
                });
            })

        if (!this.state.hasFetchedData) {
            this.setState({
                statusMessage: 'Status message:  Question id does not exist!'
            });
        }
    }


    deleteQuestion(event: any) {

        this.setState({
            hasFetchedData: false
        });

        fetch('api/Questions/Delete?actualId=' + this.state.actualId)

            .then(data => {
                console.log('Delete Qustion: ', data);
                console.log('Ok: ', data.ok)
                this.setState({
                    statusOk: data.ok
                });
                return data.json();
            })

            .then(json => {
                console.log('Delete Question json: ', json);
                this.setState({
                    hasFetchedData: true,
                    statusMessage: 'Status message:  Question id: ' + this.state.actualId + ' successfully deleted'
                });
            })

        if (!this.state.hasFetchedData) {
            this.setState({
                statusMessage: 'Status message:  Question id does not exist!'
            });
        }
    }



    showAllQuestions() {

        fetch('api/GetQuestions')

            .then(data => {
                console.log('All Qustion Data: ', data);
                return data.json();
            })
            .then(obj => {
                this.setState({
                    question: obj,
                    allQuestionInfo: "Quizz: Id, QuizzEng, QuizzSwe, Correct, Score"
                });
            })

            .then(json => {
                console.log('All Question json: ', json);
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