<form class="form-horizontal">
    <div class="form-group">
        <label for="input-loan-amount" class="col-sm-3 control-label">Remaining Balance</label>
        <div class="col-sm-3">
            <div class="input-group">
                <span class="input-group-addon">$</span>
                <input type="number" class="form-control loan-amount" id="input-loan-amount" value="<%- amount %>">
            </div>
        </div>
    </div>
    <div class="form-group">
        <label for="input-interest-rate" class="col-sm-3 control-label">Interest Rate</label>
        <div class="col-sm-3">
            <div class="input-group">
                <input type="number" class="form-control interest-rate" id="input-interest-rate" value="<%- interestRate %>">
                <span class="input-group-addon">%</span>
            </div>
        </div>
    </div>
    <div class="form-group">
        <label for="input-payment-amount" class="col-sm-3 control-label">Monthly Payment</label>
        <div class="col-sm-3">
            <div class="input-group">
                <span class="input-group-addon">$</span>
                <input type="number" class="form-control payment-amount" id="input-payment-amount" value="<%- paymentAmount %>">
            </div>
        </div>
    </div>
    <div class="form-group">
        <div class="col-sm-offset-3 col-sm-4">
            <button type="submit" class="btn btn-primary calculate">Calculate</button>
        </div>
    </div>
</form>
