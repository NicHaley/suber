#pragma strict

function Update () 
{
	var xyVelocity = Vector2(rigidbody2D.velocity.x, rigidbody2D.velocity.y);
	xyVelocity.Normalize();
	
	var rotationZ : float = Mathf.Atan2(xyVelocity.y, xyVelocity.x) * Mathf.Rad2Deg;
	transform.rotation = Quaternion.Euler(0f, 0f, rotationZ);

}