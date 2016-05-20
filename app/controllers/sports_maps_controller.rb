class SportsMapsController < ApplicationController
  # before_action :set_sports_map, only: [:show, :edit, :update, :destroy]

  # GET /sports_maps
  # GET /sports_maps.json
  def index
    # @sports_maps = SportsMap.all
  end

  # # GET /sports_maps/1
  # # GET /sports_maps/1.json
  # def show
  # end

  # # GET /sports_maps/new
  # def new
  #   # @sports_map = SportsMap.new
  # end

  # # GET /sports_maps/1/edit
  # def edit
  # end

  # POST /sports_maps
  # POST /sports_maps.jso
  
    def mapdraw
    end  
  # PATCH/PUT /sports_maps/1
  # PATCH/PUT /sports_maps/1.json
  # def update
  #   respond_to do |format|
  #     if @sports_map.update(sports_map_params) 
  #       format.html { redirect_to @sports_map, notice: 'Sports map was successfully updated.' }
  #       format.json { render :show, status: :ok, location: @sports_map }
  #     else
  #       format.html { render :edit }
  #       format.json { render json: @sports_map.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # DELETE /sports_maps/1
  # DELETE /sports_maps/1.json
  # def destroy
  #   @sports_map.destroy
  #   respond_to do |format|
  #     format.html { redirect_to sports_maps_url, notice: 'Sports map was successfully destroyed.' }
  #     format.json { head :no_content }
  #   end
  # end

  # private
  #   # Use callbacks to share common setup or constraints between actions.
  #   def set_sports_map
  #     @sports_map = SportsMap.find(params[:id])
  #   end

  #   # Never trust parameters from the scary internet, only allow the white list through.
  #   def sports_map_params
  #     params.require(:sports_map).permit(:title, :description)
  #   end
end