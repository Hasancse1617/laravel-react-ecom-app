import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {createAction} from '../../store/actions/BrandAction';

const AddModal = () => {
    const { message } = useSelector((state)=>state.BrandReducer);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        name:''
    });
    const handleInputs = (e) =>{
        setState({
          ...state,
          [e.target.name]: e.target.value
        })
      }
      const createBrand = (e) =>{
        e.preventDefault();
        dispatch(createAction(state));
      }

    useEffect(()=>{
       setState({ name:'' })
    },[message])
    return (
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add Brand</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form onSubmit={createBrand}>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Brand Name:</label>
                            <input type="text" onChange={handleInputs} class="form-control" name="name" value={state.name} />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="close-modal" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" >Save</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
}

export default AddModal;