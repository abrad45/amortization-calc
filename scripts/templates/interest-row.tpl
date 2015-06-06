<form class="form-inline loan-with-interest">
    <div class="form-group">
        <label for="input-loan-amount" class="control-label">I owe </label>
        <div class="input-group">
            <span class="input-group-addon">$</span>
            <input type="number" class="form-control loan-amount" placeholder="0" />
        </div>
    </div>
    <!-- @todo make sure these have IDs with proper labels -->
    <div class="form-group">
        <label for="input-interest-rate" class="control-label"> at a rate of </label>
        <div class="input-group">
            <input type="number" class="form-control interest-rate" placeholder="0.0" />
            <span class="input-group-addon">%</span>
        </div>
    </div>
    <div class="form-group">
        <span class="and"> and...</span>
        <button type="button" class="btn btn-primary button-add-loan">Add</button>
    </div>
</form>
