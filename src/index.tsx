import * as React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import './styles';
import { text } from './temp';

class App extends React.PureComponent<IProps, any> {

    public render(): JSX.Element {
        return (
            <React.Fragment>
                <div className="container">
                    {text} asdasd
                    <h2>{this.props.count}</h2>
                    <input
                        type="button"
                        value={'++'}
                        onClick={this.props.increment}
                    />
                </div>
            </React.Fragment>
        );
    }
}

type IProps = IStateToProps & IDispatchToProps;

interface IStateToProps {
    count: number;
}

interface IDispatchToProps {
    increment: () => void;
}

const mapStateToProps = ({ tempReducer }: any): IStateToProps => {
    return {
        ...tempReducer
    };
};

const increment = () => {
    return { type: 'INCREMENT' };
};

const mapDispatchToProps = (dispatch: Function): IDispatchToProps => {
    return {
        increment: () => dispatch(increment())
    };
};

export default connect<IStateToProps, IDispatchToProps>(mapStateToProps, mapDispatchToProps)(hot(module)(App));
