require 'base64'
require 'digest'
require 'openssl'

module SignRequest

  def self.call(method, path, body, timestamp, public_key, private_key)
    raise ArgumentError, 'method is required'       if method.nil?
    raise ArgumentError, 'path is required'         if path.nil?
    raise ArgumentError, 'timestamp is required'    if timestamp.nil?
    raise ArgumentError, 'public_key is required'   if public_key.nil?
    raise ArgumentError, 'private_key is required'  if private_key.nil?
    
    data = [  method.to_s.upcase,
              path.to_s.downcase,
              body_digest(body),
              timestamp,
              public_key ].join("\n").strip
    
    hmac = OpenSSL::HMAC.new(private_key, 'sha256')
    hmac << data
    Base64.strict_encode64(hmac.digest)
  end

  class << self
    
    # -----------------------------------------------------
    # Private Methods
    # -----------------------------------------------------
    
    private
    
    def body_digest(body)
      return "" if body.nil?
      Digest::MD5.base64digest(body)
    end
  end
end