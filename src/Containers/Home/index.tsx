import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles.scss';

type Props = IStateToProps & IDispatchToProps;

type State = {};

class Home extends React.PureComponent<Props, State> {
    public render(): JSX.Element {
        return (
            <>
                <h1>Home component</h1>
                <span className="title">dada</span>
                <Link to="/about">About</Link>
            </>
        );
    }
}

interface IStateToProps { }

interface IDispatchToProps { }

const mapStateToProps = (state: any): IStateToProps => {
    return {
    };
};

const mapDispatchToProps = (dispatch: Function): IDispatchToProps => {
    return {};
};

export default connect<IStateToProps, IDispatchToProps>(mapStateToProps, mapDispatchToProps)(Home);
