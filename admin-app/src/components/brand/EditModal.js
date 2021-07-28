import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAction } from "../../store/actions/BrandAction";
import { REMOVE_BRAND_STATUS } from "../../store/types/BrandType";

const EditModal = (props) => {
    
    let { brand, status } = useSelector((state)=>state.BrandReducer);
    const [state, setState] = useState({
        id:'',
        name:'',
    });

    const dispatch = useDispatch();
    const updateBrand = (e) =>{
        e.preventDefault();
        dispatch(updateAction(state,state.id));
    }
    useEffect(() => { 
        if(status){
            setState({
                id:brand.id,
                name:brand.name,
            });
            dispatch({type: REMOVE_BRAND_STATUS});
        }
     },[brand,status]);
    return(
        <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add Brand</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form onSubmit={updateBrand}>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Brand Name:</label>
                            <input type="text" onChange={(e)=>setState({...state,name:e.target.value})} class="form-control" name="name" value={state.name} />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="edit-modal" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" >Save</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
}

export default EditModal;