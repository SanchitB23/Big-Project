import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../store";
import {useMemo} from "react";

export const useActions = () => {
    const dispatch = useDispatch()
    //memoization so that actionCreators dont rerender to infinite loop
    return useMemo(() => {
        return bindActionCreators(actionCreators, dispatch)
    }, [dispatch])
}
