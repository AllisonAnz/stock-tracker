class StocksController < ApplicationController
    include CurrentUserConcern
   rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  def index
   stocks = @current_user.stocks.all
   tickers = stocks.map{|x| x[:ticker]}
   stock_quote = Stock.get_stock(tickers).to_json
   render json: stock_quote
  end

  def show 
    #byebug
    url_params = params[:id]
    @stock = @current_user.stocks.find{|stock| stock.ticker === url_params  }
    stock_quote = Stock.get_stock(url_params)
    render json: {
            stock: @stock,
            stock_quote: stock_quote
          }
  end

  def create
    add_stock = @current_user.stocks.find_or_create_by!(stock_params)
    render json: add_stock
  end
  
  def update 
    stock = @current_user.stocks.find(params[:id])
    #byebug
    total_shares = Stock.update_shares(stock, params[:shares])
    #total_shares = (stock.shares + params[:shares])
    stock.shares = total_shares 
    stock.avg_cost = ((stock.total_cost) + (params[:shares] * params[:avg_cost]))/stock.shares
    #stock.total_cost = (stock.avg_cost) * (stock.shares)
    stock.save!

    
    
    #stock.update!(edit_stock_params)
    render json: stock
  end


  private 

  def stock_params 
    params.permit(:ticker)
  end

  def edit_stock_params
    params.permit(:shares, :avg_cost, :total_cost) 
  end

 

   def render_unprocessable_entity_response(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end

end
